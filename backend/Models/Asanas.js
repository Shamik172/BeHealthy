const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AsanasSchema = new Schema({
    id :{
        type: String,
        required:true,
        unique:true 
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    sanskritName: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['Standing', 'Seated', 'Balancing', 'Restorative', 'Backbend', 'Forward Bend', 'Twist', 'Inversion', 'Core', 'Other'],
        default: 'Other'
    },
    bodyParts: {
        type: [String],
        required: true,
        default: []
    },
    diseases: {
        type: [String],
        default: []
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    duration: {
        min: {
            type: String,
            default: '30 seconds'
        },
        max: {
            type: String,
            default: '1 minute'
        }
    },
    benefits: {
        type: [String],
        default: []
    },
    steps: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    }],
    commonMistakes: [{
        mistake: {
            type: String,
            required: true,
            trim: true
        },
        correction: {
            type: String,
            required: true,
            trim: true
        }
    }],
    precautions: {
        type: [String],
        default: []
    },
    modifications: {
        type: [String],
        default: []
    },
    props: {
        type: [String],
        default: []
    },
    chakra: {
        type: String,
        enum: ['Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown', 'None'],
        default: 'None'
    },
    preparatoryPoses: {
        type: [String],
        default: []
    },
    followUpPoses: {
        type: [String],
        default: []
    },
    breathInstructions: {
        type: String,
        trim: true
    },
    alignmentTips: {
        type: [String],
        default: []
    },
    image: {
        type: [String],
        default :[]
    },
    video: {
        type: [String],
        default : []
    }
}, { timestamps: true });

const AsanasModel = mongoose.model('Asanas', AsanasSchema);

module.exports = AsanasModel;