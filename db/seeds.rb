# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({username: "clement", email: "clement75009@yahoo.fr", password: 'clement'})
User.create({username: "admin", email: "clementpigeon@gmail.com", password: 'admin'})

Pin.create({song_id:1, user_id:1, text:'first pin', link:'http://www.examiner.com/images/blog/EXID19412/images/white_stripes_live(2).jpg', pin_type:0})

Song.create(band_id: 1, mid:'/m/0g67whh', title:'1901')