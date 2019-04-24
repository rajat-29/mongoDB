var addbutton = document.getElementById("addbutton");
var list = document.getElementById('list')
var form = document.getElementById("showform");
var STATUS_OK = 200;
var tasks = [];
addbutton.addEventListener("click",function()
{
    addbutton.setAttribute("style","visibility:hidden");
    list.setAttribute("style","visibility:hidden");
    showform();
});

    console.log('page is fully loaded');
    var request = new XMLHttpRequest();
    var file_name = "products";
    request.open('GET',file_name);
    request.send();
    request.addEventListener("load",function()
    {
        console.log("data aagya");
        if (request.status === STATUS_OK)
        {
            tasks = JSON.parse(request.responseText);
            for(var i in tasks)
            {
                addtoDOM(tasks[i]);
            }
        }
    });

function showform()
{

    var name = document.createElement("label");
    name.innerHTML = "Enter product Name:  ";
    form.appendChild(name);

    var input = document.createElement("input");
    input.setAttribute("type","text");
    form.appendChild(input);
    insertBlankLine(form);
    insertBlankLine(form);

    var desc = document.createElement("label");
    desc.innerHTML = "Enter product Description:  ";
    form.appendChild(desc);

    var descinput = document.createElement("input");
    descinput.setAttribute("type","text");
    form.appendChild(descinput);
    insertBlankLine(form);
    insertBlankLine(form);


    var price = document.createElement("label");
    price.innerHTML = "Enter product Price:  ";
    form.appendChild(price);

    var priceinput = document.createElement("input");
    priceinput.setAttribute("type","text");
    form.appendChild(priceinput);
    insertBlankLine(form);
    insertBlankLine(form);


    var quant = document.createElement("label");
    quant.innerHTML = "Enter product Quantity:  ";
    form.appendChild(quant);

    var quantinput = document.createElement("input");
    quantinput.setAttribute("type","text");
    form.appendChild(quantinput);
    insertBlankLine(form);
    insertBlankLine(form);

    var button = document.createElement("button");
    button.innerHTML = "Submit Product";
    form.appendChild(button);
    insertBlankLine(form);
    insertBlankLine(form);

    button.addEventListener("click",function()
    {
          var obj = new Object();
          obj.Name = input.value;
          obj.Desc = descinput.value;
          obj.Price = priceinput.value;
          obj.Quantity = quantinput.value;
          var request = new XMLHttpRequest();
          var filename = "products" ;
          request.open('POST',filename);
          request.setRequestHeader("Content-Type","application/json");
          request.send(JSON.stringify(obj))
          request.addEventListener("load",function()
          {
              console.log(request.responseText);
              addtoDOM(obj);
              addbutton.setAttribute("style","visibility:visible");
              list.setAttribute("style","visibility:visisble");
              deleteNewformpanel();
          });
    });
}

function addtoDOM(obj)
{
    var tr = document.createElement("tr");

    var name = document.createElement("td");
    var p = document.createElement("p")
    p.innerHTML = obj.Name;
    name.appendChild(p);
    tr.appendChild(name);

    var desc = document.createElement("td");
    var p1 = document.createElement("p")
    p1.innerHTML = obj.Desc;
    desc.appendChild(p1);
    tr.appendChild(desc);

    var price = document.createElement("td");
    var p2 = document.createElement("p")
    p2.innerHTML = obj.Price;
    price.appendChild(p2);
    tr.appendChild(price);

    var edit = document.createElement("td");
    var p3 = document.createElement("button");
    p3.innerHTML = "EDIT";
    edit.appendChild(p3);
    tr.appendChild(edit);

    p3.addEventListener("click",function(event)
    {
        addbutton.setAttribute("style","visibility:hidden");
        list.setAttribute("style","visibility:hidden");
        createform(obj);
    });

    var deletee = document.createElement("td");
    var del = document.createElement("button")
    del.innerHTML = "X";
    deletee.appendChild(del);
    tr.appendChild(deletee);

    del.addEventListener("click",function(event)
    {
        event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode)
        var filename = obj._id.toString();
        console.log(filename);
        var request = new XMLHttpRequest();
        request.open('DELETE',filename);
        //request.setRequestHeader("Content-Type","application/json");
        //request.send(JSON.stringify({text: obj}));
        request.send();
        request.addEventListener("load",function()
        {
            console.log(request.responseText);
        });

    });
    list.appendChild(tr);
}

function insertBlankLine(targetElement)
{
    var br = document.createElement("br");
    targetElement.appendChild(br);
}

function deleteNewformpanel()
{
   var childNodes = form.childNodes;
   for (var i = 0; childNodes.length > 0;)
   {
      form.removeChild(childNodes[i]);
   }
}

function createform(obj)
{
  var name = document.createElement("label");
  name.innerHTML = "Enter product Name:  ";
  form.appendChild(name);

  var input = document.createElement("input");
  input.setAttribute("type","text");
  input.value = obj.Name;
  form.appendChild(input);
  insertBlankLine(form);
  insertBlankLine(form);

  var desc = document.createElement("label");
  desc.innerHTML = "Enter product Description:  ";
  form.appendChild(desc);

  var descinput = document.createElement("input");
  descinput.setAttribute("type","text");
  descinput.value = obj.Desc;
  form.appendChild(descinput);
  insertBlankLine(form);
  insertBlankLine(form);


  var price = document.createElement("label");
  price.innerHTML = "Enter product Price:  ";
  form.appendChild(price);

  var priceinput = document.createElement("input");
  priceinput.setAttribute("type","text");
  priceinput.value = obj.Price;
  form.appendChild(priceinput);
  insertBlankLine(form);
  insertBlankLine(form);


  var quant = document.createElement("label");
  quant.innerHTML = "Enter product Quantity:  ";
  form.appendChild(quant);

  var quantinput = document.createElement("input");
  quantinput.setAttribute("type","text");
  quantinput.value = obj.Quantity;
  form.appendChild(quantinput);
  insertBlankLine(form);
  insertBlankLine(form);

  var button = document.createElement("button");
  button.innerHTML = "Submit Product";
  form.appendChild(button);
  insertBlankLine(form);
  insertBlankLine(form);

  button.addEventListener("click",function()
  {
        var obj1 = Object();
        obj1.Name = input.value;
        obj1.Desc = descinput.value;
        obj1.Price = priceinput.value;
        obj1.Quantity = quantinput.value;
        //obj1._id = obj._id;
        var request = new XMLHttpRequest();
        var filename = obj._id.toString();
        console.log(filename);
        request.open('PUT',filename);
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify({text: obj1}))
        request.addEventListener("load",function()
        {
          console.log(request.responseText)
        });

        addbutton.setAttribute("style","visibility:visible");
        list.setAttribute("style","visibility:visisble");
        deleteNewformpanel();
  });
}

