const fs = require("fs");
const path = require("path");

const Prism = require("prismjs");
const hljs = require("highlight.js");

const MAX_PER_FOLDER = 1000;

const writes = [];

// Just opens the files and save them elsewhere.
function f1(root, saveRoot) {
  fs.rmdirSync(saveRoot, { recursive: true });
  fs.mkdirSync(saveRoot, { recursive: true });

  for (const [folder, files] of walker(root)) {
    let count = 0;
    const name =
      {
        javascript: "js",
      }[path.basename(folder)] || path.basename(folder);
    if (["css", "html", "js", "xml"].includes(name)) {
      for (const file of files) {
        const fp = path.join(folder, file);
        if (count++ >= MAX_PER_FOLDER) {
          break;
        }
        const payload = fs.readFileSync(fp, "utf8");
        const destination = path.join(
          saveRoot,
          name,
          path.basename(fp).replace(/\.txt/, ".html")
        );
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, payload);
        // writes.push({ destination, fp });
      }
    }
  }
}

// Use PrismJS
function f2(root, saveRoot) {
  fs.rmdirSync(saveRoot, { recursive: true });
  fs.mkdirSync(saveRoot, { recursive: true });

  for (const [folder, files] of walker(root)) {
    let count = 0;
    const name =
      {
        javascript: "js",
      }[path.basename(folder)] || path.basename(folder);
    if (["css", "html", "js", "xml"].includes(name)) {
      for (const file of files) {
        const fp = path.join(folder, file);
        if (count++ >= MAX_PER_FOLDER) {
          break;
        }
        const payload = fs.readFileSync(fp, "utf8");
        const prismLang = Prism.languages[name];
        const html = Prism.highlight(payload, prismLang, name);
        const destination = path.join(
          saveRoot,
          name,
          path.basename(fp).replace(/\.txt/, ".html")
        );
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, html);
        // writes.push({ destination, fp });
      }
    }
  }
}

// Use Highlight.js
function f3(root, saveRoot) {
  fs.rmdirSync(saveRoot, { recursive: true });
  fs.mkdirSync(saveRoot, { recursive: true });

  for (const [folder, files] of walker(root)) {
    let count = 0;
    const name =
      {
        javascript: "js",
      }[path.basename(folder)] || path.basename(folder);
    if (["css", "html", "js", "xml"].includes(name)) {
      for (const file of files) {
        const fp = path.join(folder, file);
        if (count++ >= MAX_PER_FOLDER) {
          break;
        }
        const payload = fs.readFileSync(fp, "utf8");
        const html = hljs.highlight(name, payload).value;
        const destination = path.join(
          saveRoot,
          name,
          path.basename(fp).replace(/\.txt/, ".html")
        );
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, html);
        // writes.push({ destination, fp });
      }
    }
  }
}

function* walker(root, depth = 0) {
  const files = fs.readdirSync(root);
  if (!depth) {
    yield [
      root,
      files.filter((name) => {
        return !fs.statSync(path.join(root, name)).isDirectory();
      }),
    ];
  }
  for (const name of files) {
    const filepath = path.join(root, name);
    const isDirectory = fs.statSync(filepath).isDirectory();
    if (isDirectory) {
      yield [
        filepath,
        fs.readdirSync(filepath).filter((name) => {
          return !fs.statSync(path.join(filepath, name)).isDirectory();
        }),
      ];
      // Now go deeper
      yield* walker(filepath, depth + 1);
    }
  }
}

const ROOT = "/tmp/syntax-code";

// Testing if they work

// f1(ROOT, "./results/f1");
// console.log(writes);
// console.log(writes.length);
// const sizes = writes.map((w) => fs.statSync(w.fp).size);
// console.log("Average size:", sizes.reduce((a, b) => a + b, 0) / sizes.length);
// sizes.sort();
// console.log("Median size:", sizes[Math.floor(sizes.length / 2)]);

// f2(ROOT, "./results/f2");
// f3(ROOT, "./results/f3");

// Benchmarking

const functions = [f1, f2, f3];

compareFunctions(functions, (iterations = 36));

function compareFunctions(functions) {
  function fmt(ms) {
    return `${(ms / 1000).toFixed(3)}s`;
  }

  const times = Object.fromEntries(functions.map((f) => [f.name, []]));
  for (const i of [...Array(iterations).keys()]) {
    func = functions[i % functions.length];
    const t0 = new Date();
    func(ROOT, `./results/${func.name}`);
    const t1 = new Date();
    console.log(i + 1, func.name, fmt(t1 - t0));
    times[func.name].push(t1 - t0);
  }
  console.log("");

  const avgs = [];
  for (const f of Object.keys(times).sort()) {
    const nums = times[f];
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
    avgs.push([f, avg]);
  }
  1;
  avgs.sort((a, b) => a[1] - b[1]);
  const fastest = avgs[0][1];
  // sort by name again
  avgs.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

  for (const [f, avg] of avgs) {
    let p;
    if (avg === fastest) {
      p = "fastest";
    } else {
      p = `${((100 * avg) / fastest - 100).toFixed(1)}% slower`;
    }
    console.log(f, fmt(avg), " ", p);
  }
}

// Testing heap memory

// const highest = [];
// for (const i of [...Array(10).keys()]) {
//   // f1(ROOT, "./results/f1");
//   // f3(ROOT, "./results/f3");
//   f3(ROOT, "./results/f3");
//   const bytes = process.memoryUsage().heapUsed;
//   highest.push(bytes);
//   console.log(humanFileSize(bytes));
// }
// highest.sort();
// console.log("Max heap size:", humanFileSize(highest[highest.length - 1]));

// function humanFileSize(size) {
//   if (size < 1024) return size + " B";
//   let i = Math.floor(Math.log(size) / Math.log(1024));
//   let num = size / Math.pow(1024, i);
//   let round = Math.round(num);
//   num = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round;
//   return `${num} ${"KMGTPEZY"[i - 1]}B`;
// }
