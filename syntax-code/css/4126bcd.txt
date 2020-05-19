/* setup */
:root, body {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column nowrap;
  font-family: monospace;
}
.container {
  display: flex;
  overflow: auto;
  outline: 1px dashed lightgray;
  flex: none;
}

.container.x {
  width: 100%;
  height: 128px;
  flex-flow: row nowrap;
}

.container.y {
  width: 256px;
  height: 256px;
  flex-flow: column nowrap;
}
/* definite scroll snap */
.mandatory-scroll-snapping > div {
  scroll-snap-stop: always;
}
.proximity-scroll-snapping > div {
  scroll-snap-stop: normal;
}
/* scroll-snap */
.x.mandatory-scroll-snapping {
  scroll-snap-type: x mandatory;
}

.y.mandatory-scroll-snapping {
  scroll-snap-type: y mandatory;
}

.x.proximity-scroll-snapping {
  scroll-snap-type: x proximity;
}

.y.proximity-scroll-snapping {
  scroll-snap-type: y proximity;
}

.container > div {
  text-align: center;
  scroll-snap-align: center;
  flex: none;
}

.x.container > div {
  line-height: 128px;
  font-size: 64px;
  width: 100%;
  height: 128px;
}

.y.container > div {
  line-height: 256px;
  font-size: 128px;
  width: 256px;
  height: 256px;
}
/* appearance fixes */
.y.container > div:first-child {
  line-height: 1.3;
  font-size: 64px;
}
/* coloration */
.container > div:nth-child(even) {
  background-color: #87EA87;
}

.container > div:nth-child(odd) {
  background-color: #87CCEA;
}
