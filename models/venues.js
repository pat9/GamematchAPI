const mongoose = require('mongoose');
const slugify = require('../plugins/slugify')

const venueSchema = new mongoose.Schema({
    name:{type:String, required:true},
    slug:String,
    profilepic:{type:Object, required:true},
    loc:{      
        type:{type:String, required:true, default:"Point"},
        coordinates:[{type:Number, required:true, index:'2dsphere'}] ,
    },
    phone:{type:String, required:true},
    rutas:[String],
    admins:[mongoose.Types.ObjectId]
})

const Venues =  mongoose.model('venues', venueSchema);

venueSchema.statics.validateSlugCount = function(slug){
    return Venues.count({slug: slug}).then(count=>{
      if(count > 0) return false;
      return true;
    })
}

venueSchema.pre('save', (next)=>{
    if(this.slug) next();
    generateSlugAndContinue.call(this, 0, next)
})

function generateSlugAndContinue(count,next){
    this.slug = slugify(this.name);
    if(count != 0)
      this.slug = this.slug + "-"+count;
  
  
    venueSchema.validateSlugCount(this.slug).then(isValid=>{
      if(!isValid)
        return generateSlugAndContinue.call(this,count+1,next);
  
      next();
  
  
    })
  }
  
module.exports = Venues;
