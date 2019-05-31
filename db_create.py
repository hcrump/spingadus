from project import db
# from project.models import BlogPost

# create the database and tables
db.create_all()


# # insert
# db.session.add(BlogPost("Good","I\'m good."))
# db.session.add(BlogPost("Well","I\'m well."))
# db.session.add(BlogPost("Flask","discoverflask.com"))


# commit changes
db.session.commit()
