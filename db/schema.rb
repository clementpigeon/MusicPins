# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131011133449) do

  create_table "band_followings", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "band_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "band_followings", ["band_id"], :name => "index_band_followings_on_band_id"
  add_index "band_followings", ["user_id"], :name => "index_band_followings_on_user_id"

  create_table "bands", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "mid",         :null => false
    t.string   "twitter_id"
    t.string   "facebook_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "bands", ["mid"], :name => "index_bands_on_mid", :unique => true

  create_table "comments", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "pin_id",     :null => false
    t.text     "body",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "comments", ["pin_id"], :name => "index_comments_on_pin_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "likes", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "pin_id",     :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "likes", ["pin_id"], :name => "index_likes_on_pin_id"
  add_index "likes", ["user_id"], :name => "index_likes_on_user_id"

  create_table "pins", :force => true do |t|
    t.integer  "song_id",        :null => false
    t.integer  "user_id",        :null => false
    t.integer  "pin_type",       :null => false
    t.text     "text"
    t.string   "link"
    t.integer  "responds_to_id"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "pins", ["song_id"], :name => "index_pins_on_song_id"
  add_index "pins", ["user_id"], :name => "index_pins_on_user_id"

  create_table "song_followings", :force => true do |t|
    t.integer  "user_id"
    t.integer  "song_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "song_followings", ["song_id"], :name => "index_song_followings_on_song_id"
  add_index "song_followings", ["user_id"], :name => "index_song_followings_on_user_id"

  create_table "songs", :force => true do |t|
    t.string   "mid",        :null => false
    t.string   "title",      :null => false
    t.integer  "band_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "songs", ["band_id"], :name => "index_songs_on_band_id"
  add_index "songs", ["mid"], :name => "index_songs_on_mid", :unique => true

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "email",           :null => false
    t.string   "password_digest", :null => false
    t.string   "session_token",   :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username"

end
