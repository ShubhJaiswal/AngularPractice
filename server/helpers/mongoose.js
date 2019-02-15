module.exports =
{
    normalizeErrors : function(error){
        let normalizeErrors = [];
        for(let property of errors){
            if(errors.hasOwnProperty(property)){
                normalizeErrors.push({title:property, detail: errors[property].message});
            }
        }
        return normalizeErrors;
    }
}
