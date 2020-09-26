const url = "./mypdf.pdf";

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1.3;

canvas = document.querySelector('#pdf-render');
ctx = canvas.getContext('2d');

const renderPage = num => {
    pageIsRendering = true;

    // //Get Page
    pdfDoc.getPage(num).then(page => {
        console.log(page);
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        }

        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;

            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });

        document.querySelector('#page-num').textContent = num;
    });
}

const queueRenderPage = num => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}
/**
 * Displays next page.
 */
function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}


pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    console.log(pdfDoc_);

    document.querySelector('#page-count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
});

document.querySelector('#prev').addEventListener('click', onPrevPage);
document.querySelector('#next').addEventListener('click', onNextPage);
