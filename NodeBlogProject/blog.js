var mongo=require('mongodb');
var db=new mongo.Db('mydb',new mongo.Server('localhost',27017,{}),{});
var util = require('util');
var events = require('events');


function Blog() {
    if(false === (this instanceof Blog)) {
        return new Blog();
    }

    events.EventEmitter.call(this);
}


util.inherits(Blog, events.EventEmitter);

	
Blog.prototype.readBlogs = function (response){
	var self = this;
	db.open(function(){
		db.collection('blogEntry',function(err,collection){
			collection.find(function(err, cursor) {
				cursor.each(function(err, blogEntry) {
					if(blogEntry!=null){
					response.write("<a href='"+blogEntry.url+"'>"+blogEntry.name+"</a>");
					}else{
						db.close();
						self.emit('end', 'end');
					}
				});
	            
				
			});
		});
	});
	
	return;
}

Blog.prototype.getEntry = function (url,response){
	var self = this;
	db.open(function(){
		db.collection('blogEntry',function(err,collection){
			collection.findOne({url:url},function(err, element) {
				if(element!=null){
					response.write("<div class='content'>");
						response.write("<div class='blog-entry'>");
							response.write("<div class='blog-name'>"+element.name+"</div>");
							response.write("<div class='blog-date'>"+element.date+"</div>");
							response.write("<div class='blog-body'>"+element.body+"</div>");
						response.write("</div>");
						response.write("<div class='blog-entry-comments'>");
						
						response.write('<div id="disqus_thread"></div>');

						
							response.write('<script type="text/javascript">');
								response.write('/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */\n');
								response.write('var disqus_shortname = "ignaciobona"; // required: replace example with your forum shortname\n');
								response.write('var disqus_identifier="'+element._id+'";\n');
								response.write('var disqus_url ="http://www.ignaciobona.com/blog/'+element.url+'";\n');
								response.write('var disqus_developer = 1;\n');
								response.write('var disqus_title ="'+element.name+'";\n');
								response.write("/* * * DON'T EDIT BELOW THIS LINE * * */\n");
								response.write('$().ready(function() {\n');
									response.write("var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;\n");
									response.write("dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';\n");
									response.write('(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);\n');
								response.write('});\n');
							response.write('</script>');
							response.write('<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>');
							response.write('<a href="http://disqus.com" class="dsq-brlink">blog comments powered by <span class="logo-disqus">Disqus</span></a>');
				
							
						response.write("</div>");
					response.write("</div>");
					response.write("<div class='right-column'>");
					response.write("hello");
					response.write("</div>");
					
				}else{
					response.write("Not found");
				}
				db.close();
				self.emit('end', 'end');
				
			});
		});
	});
	
	return;
}



Blog.prototype.insertBlog=function(){
	var self = this;
	db.open(function(){
		db.collection('blogEntry',function(err,collection){
			
			blog={
				"name":"First Blog Entry",
				"author":"Ignacio Bona",
				"date":new Date(),
				"body":"Here is a blog post"
			};
			collection.insert(blog,function(){
				db.close();	
				self.emit('end', 'end');
			});
			
		});
	});
	
	return;
}


module.exports = Blog;

