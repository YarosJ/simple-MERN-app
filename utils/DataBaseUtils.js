import mongoose from "mongoose";
import {db} from '../config.json';
import '../models/Testimonial'

const Testimonial = mongoose.model('Testimonial');
const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, {useMongoClient: true});
}

export let mongooseConnection = mongoose.connection;

/**
 * Testimonials
 */


export function listTestimonials() {
    return Testimonial.find();
}

export function createTestimonial(data) {
    const testimonial = new Testimonial({
        title: data.title,
        body: data.body,
        autor: data.autor,
        gender: data.gender,
        createdAt: new Date()
    });

    return testimonial.save();
}

export function updateTestimonial(data, id) {
    return Testimonial.findOneAndUpdate({_id: id}, data,  { 'new': true });
}

export function deleteTestimonial(id) {
    return Testimonial.findById(id).remove();
}

/**
 * Users
 */

export function listUsers() {
    return User.find();
}

export function createUser(data) {
    const user = new User({
        email: data.email,
        password: data.password,
        rights: data.rights,
        createdAt: new Date()
    });
console.log(user);
    return user.save();
}

export function updateUser(data) {
    return User.findOneAndUpdate({email: data.email}, data, { 'new': true });
}

export function deleteUser(id) {
    return User.findById(id).remove();
}