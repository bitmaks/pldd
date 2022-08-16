/*
 Code from w3schools: https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
*/
function magnify(imgSrc, zoom) {
    function getSuffix(src) {
        const re = /[^_]+[.][a-zA-Z]+$/g;
        const filename = src.match(re);
        return filename[0];
    }
    function removeExtension(file) {
        const re = /^[^.]+/g;
        const match = file.match(re);
        return match[0];
    }
    var img, glass, w, h, bw, out1, out2, out3, out4;
    var o1, o2, o3, o4;

    var fileSuffix = getSuffix(imgSrc);
    var imgRoot = "./img/";
    img = document.getElementById("img-raw");
    img.src = imgRoot + "y_" + fileSuffix;

    o1 = "dpir";
    o2 = "purelet";
    o3 = "p4ip";
    o4 = "wiener";
    out1 = document.getElementById(o1);
    out2 = document.getElementById(o2);
    out3 = document.getElementById(o3);
    out4 = document.getElementById(o4);

    labelX = document.getElementById("labelX");
    labelY = document.getElementById("labelY");
    labelFilename = document.getElementById("labelFilename");
    labelFilename.textContent = "image: " + "y_" + removeExtension(fileSuffix);

    /*create magnifier glass:*/
    var instances = document.getElementsByClassName("comparison-interactive-img-magnifying-glass")
    var glass;
    if (instances.length == 0) {
        glass = document.createElement("DIV");
        glass.setAttribute("class", "comparison-interactive-img-magnifying-glass");
        /*insert magnifier glass:*/
        img.parentElement.insertBefore(glass, img);
    } else {
        glass = instances[0];
    }

    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

	/*set background properties for the output images*/
    out1.style.backgroundImage = "url('" + imgRoot + o1 + "_" + fileSuffix + "')";
    out1.style.backgroundRepeat = "no-repeat";
    out1.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    out2.style.backgroundImage = "url('" + imgRoot + o2 + "_" + fileSuffix + "')";
    out2.style.backgroundRepeat = "no-repeat";
    out2.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    out3.style.backgroundImage = "url('" + imgRoot + o3 + "_" + fileSuffix + "')";
    out3.style.backgroundRepeat = "no-repeat";
    out3.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    out4.style.backgroundImage = "url('" + imgRoot + o4 + "_" + fileSuffix + "')";
    out4.style.backgroundRepeat = "no-repeat";
    out4.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    /* calculate ratio between divs */
    dx = out1.width/4;
    dy = out1.width/3;

    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
         labelX.textContent = ("mouseX: " + parseInt(30 + x));
        y = pos.y;
         labelY.textContent = ("mouseY: " + parseInt(30 + y));
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.width - (w / zoom)) {
            x = img.width - (w / zoom);
        }
        if (x < w / zoom) {
            x = w / zoom;
        }
        if (y > img.height - (h / zoom)) {
            y = img.height - (h / zoom);
        }
        if (y < h / zoom) {
            y = h / zoom;
        }
        /*set the position of the magnifier glass:*/
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /*display what the magnifier glass "sees" to the right outputs*/
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        out1.style.backgroundPosition = "-" + ((x * zoom) - w -dx + bw) + "px -" + ((y * zoom) - h - dy + bw) + "px";
        out2.style.backgroundPosition = "-" + ((x * zoom) - w -dx + bw) + "px -" + ((y * zoom) - h - dy + bw) + "px";
        out3.style.backgroundPosition = "-" + ((x * zoom) - w -dx + bw) + "px -" + ((y * zoom) - h - dy + bw) + "px";
        out4.style.backgroundPosition = "-" + ((x * zoom) - w -dx + bw) + "px -" + ((y * zoom) - h - dy + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0,
            y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {
            x: x,
            y: y
        };
    }
}

function magnifier(el, zoom) {
    var childs = Array.from(el.parentElement.children);
    childs.forEach(child => child.className = "comparison-option");
    magnify(el.src, 4)
    el.className += " comparison-selected"
}

window.addEventListener('load', function() {
    var first = document.getElementById("option-1");
    magnifier(first, 4);
})
