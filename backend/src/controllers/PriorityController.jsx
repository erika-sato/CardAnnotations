const Annotations = require('../models/AnnotationData.jsx')

module.exports = {

    async read(request, response) {
        const priority = request.query //pedido de informação de um determinado parâmetro selecionado (ex: retornar somente as prioridades marcadas como true)
    
        const priorityNotes = await Annotations.find(priority)
        
        return response.json(priorityNotes)
    
    },

    async update(request, response) {
        const {id} = request.params   //fç toggle entre ser ou não um card de prioridade, buscando no bd o id deste registro e fazer a verificação (se true -> false e vice-versa)
        
        const annotation = await Annotations.findOne({_id : id})
   
        if(annotation.priority) {
            annotation.priority = false
        } else {
            annotation.priority = true
        }

        await annotation.save()

        return response.json(annotation)
   
    }

}