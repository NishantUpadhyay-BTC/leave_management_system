# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


ROLES = [{name: 'admin'}, {name: 'employee'}]
ROLES.each{ |role| Role.find_or_create_by!(role) }

User.create(name: "prina", email: "prina.patel@botreetechnologies.com", designation: "developer", gender: 1, date_of_joining: Date.parse('2016-07-11'),date_of_birth: Date.parse('2016-08-12'), role_id: 1, password: "123456", confirmed_at: Date.today)
User.create(name: "abc", email: "prinapatel.2211@gmail.com", designation: "developer", gender: 1, date_of_joining: Date.parse('2016-03-04'), date_of_birth: Date.parse('1999-03-02'),role_id: 2, password: "123456", confirmed_at: Date.today )