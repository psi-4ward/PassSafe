module WikiPasssafeMacro
  Redmine::WikiFormatting::Macros.register do
    desc "Adds a password safe to the wiki page:\n\n" +
      " @!{{passsafe}}@\n"

    macro :passsafe do |obj, args|
      o = '<div class="passsafe" style="display:none">'
      if !args.empty?
        o << args[0]
      end
      o << '</div>'
      o << '<iframe src="' + Redmine::Utils::relative_url_root + '/plugin_assets/redmine_wiki_passsafe/index.html" style="width: 100%; border: 0px solid"></iframe>'
      o.html_safe
    end

  end
end
