ActiveRecord - Titanium
=======================
This is the test Titanium Application to verify that the Titanium ActiveRecord adapter for ActiveJS is working properly.  Here is the [link](http://github.com/sr3d/activejs-1584174) to the main repository for the ActiveJS fork.

<img src="http://cl.ly/efd83fc8696da14f21d5/content">

The test suite is almost a direct copy/paste from the ActiveJS's test suite.  Currently the Titanium's adapter for ActiveRecord passes 90% of the tests, failing at 

- Finder's Callback
- Migration

I don't think the callback is that critical, so it can safely be ignored.  For the migration, I probably need some more time to look into it.  But for now it can also safely be ignored.

If you want to browse the source code quickly, use [GithubFinder](http://sr3d.github.com/GithubFinder/?utm_source=titanium_activerecord&user_id=sr3d&repo=titanium_activerecord&branch=master)

[<img src="http://cl.ly/307e03db6d3bf380da47/content">](http://sr3d.github.com/GithubFinder/?utm_source=titanium_activerecord&user_id=sr3d&repo=titanium_activerecord&branch=master)


Download and Usage
==================
Drop the [active_record.js](http://github.com/sr3d/titanium_activerecord/raw/master/Resources/tests/active_record.js) file into your Titanium project and include it.

    Ti.include('path/to/active_record.js');

To initialize ActiveRecord:

    ActiveRecord.logging      = true;
    ActiveSupport.log         = Ti.API.debug;

    /* Set the Adapter to Titanium and connect to the default 'app.sqlite' database */
    ActiveRecord.connect(ActiveRecord.Adapters.Titanium);

Or if you want to connect to another database,
  
    ActiveRecord.connect(ActiveRecord.Adapters.Titanium, "database_name");
    
To create a new Model, use


    var User = ActiveRecord.create('users',{
        name: '',
        password: '',
        comment_count: 0,
        post_count: 0,
        credit_card_id: 0
    });
    //you can mix and match singular, plural, camelcase, normal
    User.hasMany('Comment',{
        dependent: true
    });
    User.hasMany('posts',{
        dependent: true
    });
    User.hasOne(CreditCard,{
        dependent: true
    });
    
    
Then to create a new User record

    var abbey = User.create({
        name: 'Abbey'
    });    

and to find abbey:

    User.findByName('Abbey');


Please refer to the test's suite source under Resources/tests/, and especially the [setup.js](http://github.com/sr3d/titanium_activerecord/blob/master/Resources/tests/setup.js) file. 
  

Benchmark
=========
I also throw in a benchmark test to see how much of a performance hit it is.  It's about 4 times slower for SELECT (since it needs to re-construct the objects), and 1.20 times slower for CREATE.


    [DEBUG] ActiveRecord CREATE takes 2355ms
    [DEBUG] ActiveRecord SELECT takes 719ms
    [DEBUG] Raw SELECT takes 164ms
    [DEBUG] Raw CREATE takes 1967ms


Compile & Running
=================
The app has been compiled successfully with Titanium Developer 1.2.1 with 1.4.0 SDK and iPhone 4.1 SDK.

You don't need to initialize the activejs submodule in order to compile the app.  However, if you need to hack, then here are the steps:

- Init the submodules

    $ gh submodule init
    $ gh submodule update

Remember to install the github gem (gem install github).  I could only get this gem to work in ruby 1.8.7 so rvm came to the rescue.

-  Build the active_record.js file: cd into the activejs-1584174 folder and run

    rake dist

This will build the files and copy the active_record.js to the dist folder.  I just update the Rakefile to automatically copy the compiled file to the /Resources/test/ folder (however this file is not committed in since the activejs-1584174 folder is another github repo).

    task :dist, :copy_locations do |task,arguments|
      puts "Building ActiveJS distributions with Sprockets"
      ActiveJSHelper.sprocketize
      ActiveJSHelper::DISTRIBUTIONS.each_pair do |target,payload|
        puts "Built #{File.expand_path(File.join(ActiveJSHelper::DIST_DIR,target))}"
      end
      if !arguments[:copy_locations].nil?
        arguments[:copy_locations].split(',').each do |location_pair|
          source, target = location_pair.split(':')
          source = File.expand_path(File.join(ActiveJSHelper::DIST_DIR,source))
          target = File.expand_path(target)
          FileUtils.copy(
            source,
            target
          )
          puts "Copied #{source} to #{target}"
        end
      end
      puts "Task complete."

      puts "copy active_record.js to lib"
      FileUtils.copy "dist/active_record.js", "../Resources/tests/"
  
    end

Note to self:  to push the changes in the activejs-1584174 folder, cd into it, and run 

    git push push


Refer to Github's guide on [Submodule](http://github.com/guides/developing-with-submodules) for more info.  

That's it for now.