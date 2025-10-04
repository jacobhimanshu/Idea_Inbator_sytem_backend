import { Idea } from "../models/idea.model.js";



const createIdea =  async (req,res) =>{
      try {
        const {title,shortDescription,fullDescription} = req.body;
        if(!title || !shortDescription || !fullDescription){
            return res.status(400).json({message:"All the fiels are requireed"})
        }
        // console.log("title",title)
          const newIdea = await Idea.create({
     title,
      shortDescription,
      fullDescription,
      author:req.user.id,
          })
          return res.status(201).json({
            success:true,
            message :"Idea created successfully",
            idea:newIdea
          })
      } catch (error) {
        return res.status(400).json({message:"Error while creating the idea"})
      }
}

const getAllIdea = async(req,res)=>{
       try {
          const idea = await Idea.find().populate("author","name email")
          return res.status(200).json({success:true,idea})
       } catch (error) {
        console.log("error while fething the idea");
        return res.status(500).json({message:"error fething  error"})
       }
}

const getIdeaByid = async  (req,res) =>{
            try {
    const idea = await Idea.findById(req.params.id).populate("author", "name email");
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    return res.status(200).json({ success: true, idea });
  } catch (error) {
    console.error(" Error fetching idea by id:", error);
    return res.status(500).json({ message: "Error fetching idea" });
  }
}

const updateIdea = async (req,res) =>{
         try {
           const {id}  = req.params;
          //  console.log("id",id)
           const {title,shortDescription,fullDescription}  = req.body;
           const idea = await Idea.findById(id);
           console.log("ida",idea)
           if(!idea){
            return res.status(400).json({message:"Not found idea"})
           }
           if (idea.author.toString() !== req.user.id) {   //jo user login haibas wahi update kr skta hia 
      return res.status(403).json({ message: "You are not allowed to update this idea" });
    }
     idea.title = title || idea.title;
    idea.shortDescription = shortDescription || idea.shortDescription;
    idea.fullDescription = fullDescription || idea.fullDescription;
     const updatedIdea = await idea.save();
     return res.status(201).json({ success:true,idea : updatedIdea,
                  message:"idea updated successfullly"
         })
         } catch (error) {
           console.error(" Error updating idea:", error);
    return res.status(500).json({ message: "Error updating idea" });
         }
}

const deleteIdea = async(req,res) =>{
   try {
    const {id} = req.params;
    const idea = await Idea.findById(id);
    if(!idea){
      return res.status(400).json({message:"idea not found"})
    }
    if (idea.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to delete this idea" });
    }
    await idea.deleteOne();
     return res.status(200).json({
      success: true,
      message: "Idea deleted successfully",
    });
   } catch (error) {
     return res.status(400).json({message:"Error while delteting the idea"})
   }       
}

export{
    createIdea,
    getIdeaByid,
    getAllIdea,
    updateIdea,
    deleteIdea
}