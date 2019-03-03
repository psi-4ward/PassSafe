require 'redmine'
begin
  require 'config/initializers/session_store.rb'
  rescue LoadError
end

Dir::foreach(File.join(File.dirname(__FILE__), 'lib')) do |file|
  next unless /\.rb$/ =~ file
  require file
end

require 'redmine/wiki_formatting/textile/redcloth3'
Redmine::Plugin.register :redmine_wiki_passsafe do
  name 'Password Safe Plugin'
  author 'Christoph Wiechert :: 4ward.media'
  description 'A plugin for storing passwords, use {{passsafe}} macro to create a new password safe.'
  version '0.0.1'
  RedCloth3::ALLOWED_TAGS << "div"
end
