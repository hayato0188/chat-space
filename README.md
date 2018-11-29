# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|


### Association
- has_many :groups, through: :members
- has_many :comments
