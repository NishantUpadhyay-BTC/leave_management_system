# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



User.create(name: "prina", email: "prina.patel@botreetechnologies.com", designation: "developer", gender: 'male', date_of_joining: Date.parse('2016-07-11'),date_of_birth: Date.parse('2016-08-12'), password: "123456", confirmed_at: Date.today)
User.create(name: "abc", email: "prina.2211@gmail.com", designation: "developer", gender: 'male', date_of_joining: Date.parse('2016-03-04'), date_of_birth: Date.parse('1999-03-02'), password: "123456", confirmed_at: Date.today )
