var range, sourceRange, compare;
range = document.createRange();
range.selectNode(document.getElementsByTagName("div")[0]);
sourceRange = document.createRange();
sourceRange.selectNode(document.getElementsByTagName("div")[1]);
compare = range.compareBoundaryPoints(Range.START_TO_END, sourceRange);
