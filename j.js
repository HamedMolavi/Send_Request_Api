
document.getElementById('inpUrl').addEventListener('change', (e) => {
    url = e.target.value;
})

document.getElementById('inpMethod').addEventListener('keyup', (e) => {
    if (e.target.value === "GET") {
        document.getElementById('divResponse').removeAttribute('style');
        document.getElementById('divResult').removeAttribute('style');
    } else if (e.target.value === "POST") {
        document.getElementById('divRequest').removeAttribute('style');
        document.getElementById('divResult').removeAttribute('style');
        document.getElementById('divResponse').removeAttribute('style');
    } else {
        document.getElementById('divRequest').setAttribute('style', "display: none;");
        document.getElementById('divResponse').setAttribute('style', "display: none;");
        document.getElementById('divResult').setAttribute('style', "display: none;");
        document.getElementById('bodyResponse').innerHTML = "";
        document.getElementById('info').innerText = `Plain Text: -, Status: -`;
    }
})



document.getElementById('btnSubmit').addEventListener('click', (e) => {
    if (document.getElementById('inpMethod').value === "GET") {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                response = xhttp.responseText;
                response = newLine(response, "}")
                response = newLine(response, ",")
                response = newLine(response, "{")
                document.getElementById('info').innerText = `Plain Text: ${xhttp.getResponseHeader('content-type')}, Status: ${xhttp.status}`;
                document.getElementById('bodyResponse').innerHTML = response;
            }
            else if (xhttp.readyState === 4 && xhttp.status !== 200) {
                document.getElementById('info').innerText = `Plain Text: ${xhttp.getResponseHeader('content-type')}, Status: ${xhttp.status}`;
                document.getElementById('bodyResponse').innerHTML = "Some Error Occured... :(";
            };
        }
        xhttp.open("GET", document.getElementById('inpUrl').value);
        xhttp.send();

    } else if (document.getElementById('inpMethod').value === "POST") {
        let xhttp = new XMLHttpRequest();
        console.log(1);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 201) {
                response = xhttp.responseText;
                response = newLine(response, "}")
                response = newLine(response, ",")
                response = newLine(response, "{")
                document.getElementById('bodyResponse').innerHTML = response;
                document.getElementById('info').innerText = `Plain Text: ${xhttp.getResponseHeader('content-type')}, Status: ${xhttp.status}`;
            }
            else if (xhttp.readyState === 4 && xhttp.status !== 201) {
                document.getElementById('info').innerText = `Plain Text: ${xhttp.getResponseHeader('content-type')}, Status: ${xhttp.status}`;
                document.getElementById('bodyResponse').innerHTML = "Some Error Occured... :(";
            };
        }

        xhttp.open("POST", document.getElementById('inpUrl').value);
        xhttp.setRequestHeader('Content-Type', "application/JSON");
        let data = JSON.parse(document.getElementById('inpRequest').value);
        console.log(data);
        xhttp.send(JSON.stringify(data));

    } else alert("Please Enter a Valid Method!")
})



function newLine(response, char) {
    response = response.split(char)
    for (let i = 0; i < response.length; i++) {
        if (char === "}") response[i] = response[i].concat("\n");
        else response[i] = "\n".concat(response[i]);
    }
    response = response.join(char);
    return response
}