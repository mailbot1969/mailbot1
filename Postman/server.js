const express = require('express');
let placementData = [
    {id:1,name:'XXX', company:'Mr. Cooper', branch:'IT'},
    {id:2, name:'YYY', company: 'ZOHO', branch: 'IT'},
    {id:3, name:'ZZZ',company:'Fidelity', branch:'IT'}];
const bodyParser = require('body-parser');

const port=5012

app = express();
app.use(bodyParser.json());
app.get('/placement',(req,res)=>{
    res.status(200).json(placementData);
});
app.post('/placement',async (req,res)=>{
    console.log(req.body);
    let data = {
        id: placementData.length,
        name: req.body.name,
        company: req.body.company,
        branch: req.body.branch
    }
    placementData.push(data);
    res.status(201).send("Data inserted Successfully");
});

app.put('/placement/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
    console.log(`Got request to update the id ${id}`);
    const element=placementData.find(p=>p.id === id);
    if (!element) {
            console.log('Post not found.');
            return res.status(404).send('Post not found.');
    
    }
    console.log(`Element found:${JSON.stringify(element)}`);
    element.company=req.body.company;
    element.position=req.body.position;
    element.location=req.body.location;
    res.status(201).json(element);
})
app.delete('/placement/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    const element=placementData.find(p=>p.id === id);
    if (!element) {
            console.log('Post not found.');
            return res.status(404).send('Post not found.');
    
    }
    placementData= placementData.filter(p=>p.id!==id);
    console.log("Element Deleted Sucessfully.");
    res.status(201).json(element);
});
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);

});