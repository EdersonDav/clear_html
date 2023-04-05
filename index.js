const fs = require('fs');
const data = require('./data.json')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = `
  <!DOCTYPE html>
  <html>
    <body>
      <div class="temp"></div>
    </body>
  </html>
`;

const dom = new JSDOM(html);

const document = dom.window.document;

function load (){
  if(!data.length){
    return
  }

  const result = data.map(item => ({...item, html: clearHTML(item.html)}));

  write(result);
}

function clearHTML(html){

  const temp = document.querySelector(".temp");
  temp.innerHTML = html;

  const elements = temp.querySelectorAll("*");

  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute("style");
    elements[i].removeAttribute("class");
  }

  if(!temp.innerHTML.includes('</')){
    return `<p>${temp.innerHTML}</p>`
  }

  return temp.innerHTML;
}

function write (data){
  let json = JSON.stringify(data, null, "\t");
  fs.writeFile('result.json', json, (err) =>{
    if(err)
    console.log(err)
  });
}

load();
