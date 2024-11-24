const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.fqukn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('MongoDB connected')).catch(err=>console.log(err));

const employeeSchema=new mongoose.Schema({
    name: String,
    age: Number,
    exp: Number,
    phone: String,
});

const Employee=mongoose.model('Employee',employeeSchema);


app.post('/employees',(req,res)=>{
    const newEmployee=new Employee(req.body);
    newEmployee.save()
        .then(employee=>res.status(201).json(employee))
        .catch(err=>res.status(400).json({ error: err.message}));
});

app.get('/employees',(req,res)=>{
    Employee.find().then(employees=>res.json(employees))
    .catch(err=>res.status(500).json({error: err.message}));
});

app.put('/employees/:id',(req,res)=>{
    Employee.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        .then(employee=>{
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee);
        })
        .catch(err=>res.status(400).json({ error: err.message }));
});

app.delete('/employees/:id',(req,res)=>{
    Employee.findByIdAndDelete(req.params.id)
        .then(employee=>{
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.status(204).json();
        })
        .catch(err=>res.status(500).json({ error: err.message }));
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});