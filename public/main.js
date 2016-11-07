'use strict'
let counter=0;
let counter2=0;
const b=$("#Button");
const e=$("#knopka");
const c=$("#Box1");
const d=$("#Box2");



$.ajax({
url:"/todosupdate",
type:"get",
success:function(b){
  const a=JSON.parse(b);
  for(let i=0;i<a.Sent.length;i++){
    if(a.Sent[i].STATUS===false){
  $("#list").append("<li >"+a.Sent[i].NewMess+"<input onclick=\"CheckBox("+a.Sent[i].STATUS+","+a.Sent[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" ></input>"+"<button onclick=\"Delete("+a.Sent[i].id+")\">Delete</button>"+"</li>");
}
else if(a.Sent[i].STATUS===true){
  $("#list").append("<li >"+a.Sent[i].NewMess+"<input onclick=\"CheckBox("+a.Sent[i].STATUS+","+a.Sent[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Sent[i].id+")\">Delete</button>"+"</li>");


}//end of else

}
},
error:function(){
  alert("error");
}



});//end of first get request















const Delete =function(ID){
$.ajax({
url:"/todos",
type:"delete",
data:JSON.stringify({
id:ID
}),
success:function(New){
  const a=JSON.parse(New);
  $("#list").find("li").remove();
  $("#list2").find("li").remove();
  for(let i=0;i<a.Added.length;i++){
    if(a.Added[i].STATUS===false){
  $("#list").append("<li>"+a.Added[i].NewMess+"<input onclick=\"CheckBox("+a.Added[i].STATUS+","+a.Added[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" ></input>"+"<button onclick=\"Delete("+a.Added[i].id+")\">Delete</button>"+"</li>");
}
else if(a.Added[i].STATUS===true){
  $("#list").append("<li>"+a.Added[i].NewMess+"<input onclick=\"CheckBox("+a.Added[i].STATUS+","+a.Added[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Added[i].id+")\">Delete</button>"+"</li>");


}//end of else

}//end of for
},//end of function
error:function(){
  alert("error");
}







})


}//end of delete

const CheckBox=function(STATUS,ID){
let state='';
if(STATUS===false){
  state=true;
}
else{
  state=false;
}
$.ajax({
url:"/todoChangeState",
type:"post",
data:JSON.stringify({
id:ID,
STATUS:state

}),
success:function(Maladec){
  alert(Maladec);// to be deleted
},
error: function(){
alert("error");
}



})//end of ajax
}//end of function









b.on("click",function(){
  if(counter===0){
    $("#Box1").val("");
  }
if($("#Box1").val()===""){
  alert("NO Text");
  return "";
}
$.ajax({
url:"/todos",
type:'post',
data:JSON.stringify({
NewMess:$("#Box1").val(),
STATUS:false,
id:""
}),
contentType : "application/json; charset=utf-8",
success: function(p){
const a=JSON.parse(p);
if(a.Added.STATUS===false){
$("#list").append("<li>"+a.Added.NewMess+"<input onclick=\"CheckBox("+a.Added.STATUS+","+a.Added.id+")\" style=\"margin-left:35px\" type=\"checkbox\" ></input>"+"<button onclick=\"Delete("+a.Added.id+")\">Delete</button>"+"</li>");
}//end of if
else if(a.Added.STATUS===true){
$("#list").append("<li>"+a.Added.NewMess+"<input onclick=\"CheckBox("+a.Added.STATUS+","+a.Added.id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Added.id+")\">Delete</button>"+"</li>");

}//end of else

},
error: function(){
alert("OOPs");
}
}
);//end of ajax
$("#Box1").val("");
});





c.on("click",function(){
if(counter===0){
$("#Box1").val("");
counter++;
}

});

d.on("click",function(){
if(counter2===0){
$("#Box2").val("");
counter++;
}

});

e.on("click",function(){

  if(counter===0){
    $("#Box2").val("");
  }

if($("#Box2").val()===""){
  alert("No text");
  return "";
}
$.ajax({
url:"/todos",
type:'put',
data:JSON.stringify({
NewMess:$("#Box2").val()
}),
contentType : "application/json; charset=utf-8",
success: function(p){
const a=JSON.parse(p);
$("#list2").find("li").remove();
if(typeof(a.Result)==="string"){
$("#list2").append("<li>"+a.Result+"</li>");
}
else if(typeof(a.Result)==="object"){
  for(let i=0;i<a.Result.length;i++){
    if(a.Result[i].STATUS===false){
    $("#list2").append("<li>"+a.Result[i].NewMess+"<input onclick=\"CheckBox("+a.Result[i].STATUS+","+a.Result[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\"></input>"+"<button onclick=\"Delete("+a.Result[i].id+")\">Delete</button>"+"</li>");
}
   else if(a.Result[i].STATUS===true){
     $("#list2").append("<li>"+a.Result[i].NewMess+"<input onclick=\"CheckBox("+a.Result[i].STATUS+","+a.Result[i].id+")\" style=\"margin-left:35px\" type=\"checkbox\" checked=\"checked\"></input>"+"<button onclick=\"Delete("+a.Result[i].id+")\">Delete</button>"+"</li>");
   }

  }//end of for
}//end of else
},
error: function(){
alert("error");
}
}
);//end of ajax
$("#Box2").val("");
});
