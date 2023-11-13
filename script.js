const textE1 = document.querySelector('#data');
const sizeE1 = document.querySelector('#size');
const logoE1 = document.querySelector('#logo');
const clearE1 = document.querySelector('#clear');
const marginEl = document.querySelector('#margin');
const dotModeEl = document.querySelector('#dot');
const dotColorEl1 = document.querySelector('#dot-color-1');
const dotColorEl2 = document.querySelector('#dot-color-2');
const bgEl = document.querySelector('#bg-color');
const dlEl = document.querySelector('#btn-dl');

let op={
    width: 100,
    height: 100,
    type: "png",
    data: textE1.value,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    dotsOptions: {
        color: "#4267b2",
        type: "rounded",
        gradient: {
            "type" : "linear",
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#000000"
                },
                {
                    "offset": 1,
                    "color": "#000"
                }
            ]
        }
    },
    backgroundOptions: {
        color: "#fff",
    }
};

render();

// Width and Height of QR code changed
sizeE1.addEventListener('input', e=>{
    op.width = e.target.value * 10;
    op.height = e.target.value * 10;
    render();
})

// QR code will change with text-area
textE1.addEventListener('keyup', e=>{
    op.data = e.target.value;
    render();
});

marginEl.addEventListener('input', e=>{
    op.imageOptions = {margin: e.target.value};
    render();
});

dotModeEl.addEventListener('change', e=>{
    op.dotsOptions.type = e.target.value;
    render();
});

dotColorEl1.addEventListener('input', e=>{
    op.dotsOptions.gradient.colorStops[0].color = e.target.value;
    render();
});
dotColorEl2.addEventListener('input', e=>{
    op.dotsOptions.gradient.colorStops[1].color = e.target.value;
    render();
});

bgEl.addEventListener('input', e=>{
    op.backgroundOptions.color = e.target.value;
    render();
})

var qrCode;
function render(){
    qrCode = new QRCodeStyling(op);
    let canvasE1 = document.querySelector('#canvas');
    canvasE1.innerHTML='';
    qrCode.append(canvasE1);
    canvasE1.nextElementSibling.innerHTML = `${op.width}px x ${op.height}px`;
}

function browse(){
    logoE1.click();
}

logoE1.addEventListener('change', e=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
        op.image = reader.result;
        render();
    };
    reader.readAsDataURL(file);
});


dlEl.addEventListener('click', e=>{
    qrCode.download({name:'qr', extension:'svg'})
});

clearE1.addEventListener('click', e=>{
    delete op.image;
    render();
});
