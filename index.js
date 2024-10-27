const express = require("express");

const app = express();
app.use(express.json());

todo = [{id:"lakndflnalsdn",title:"alndlfnalsdknf"}];

app.get("/todo",(req,res)=>{
    res.json(todo);
});

app.post("/todo",(req,res)=>{
    const newtodo = {
        id : crypto.randomUUID(),
        ...req.body
    }
    todo.push(newtodo)
    return res.status(201).json(newtodo);
});
app.put("/todo/:id",(req,res)=>{
    let todoFindIndex = todo.findIndex(t => t.id === req.params.id);
    if(todoFindIndex> -1){
        todo[todoFindIndex] = {
            id : todo[todoFindIndex].id,
            ... req.body
        }
        return res.status(200).json(todo[todoFindIndex]);
    }
    return res.status(404).json({
        error: "Not Found"
    });
});
app.delete("/todo/:id",(req,res)=>{
    let todoFindIndex = todo.findIndex(t => t.id === req.params.id);
    if(todoFindIndex> -1){
        const deletedTodo = todo.splice(todoFindIndex,1);
        return res.status(204).json(deletedTodo);
    }
    return res.status(404).json({
        error: "Not Found"
    });
});

app.listen(8080,()=>{
    console.log('server is running on http://localhost:8080');
})