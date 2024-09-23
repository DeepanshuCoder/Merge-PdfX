const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();
const mergePdfs = async (p1, p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge only page 2
  //   merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
  //   merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
  //   merger.add('pdf3.pdf', '1 to 2'); //merge pages 1 to 2
  //   merger.add('pdf3.pdf', '3-4'); //merge pages 3 to 4
  let d = new Date().getTime()
  await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
  return d;
}

module.exports = { mergePdfs };