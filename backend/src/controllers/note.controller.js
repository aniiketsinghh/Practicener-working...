import Note from '../models/note.model.js';
export const getNotes = async(req, res) => {
    try {
        
    // Logic to fetch notes
    const notes =await Note.find({}).sort({ createdAt: -1 });
    if (!notes || notes.length === 0) {
        return res.status(404).json({ message: "No notes found" });
    }
    return res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({ message: "Internal server error in get notes" });
        
    }
}
export const createNote = async(req, res) => {
    const { title, content } = req.body;
    try{
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    // Logic to create a note
    if(title.length < 3 || content.length < 10) {
        return res.status(400).json({ message: "Title must be at least 3 characters and content at least 10 characters long" });
    }

    const newNote = new Note({
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await newNote.save();
    return res.status(201).json({ message: "Note created successfully", newNote });
} catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal server error" });
    }    
}
export const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try{

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

   const updatedNote = Note.findByIdAndUpdate(id, { title, content, updatedAt: new Date() }, { new: true })
   if (!updatedNote) {
    return res.status(404).json({ message: "Note not found" });
   }
   return res.status(200).json({ message: "Note updated successfully", updatedNote });
} catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Internal server error" });
}  
}
export const deleteNote = (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ message: "Note deleted successfully", deletedNote });

    } catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
  