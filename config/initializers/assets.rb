# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w( bootstrap.css )
Rails.application.config.assets.precompile += %w( bootstrap.min.css )
Rails.application.config.assets.precompile += %w( landing-page.css )
Rails.application.config.assets.precompile += %w( formstyle.css )
Rails.application.config.assets.precompile += %w( styles.css )

Rails.application.config.assets.precompile += %w( jquery.js )

Rails.application.config.assets.precompile += %w( underscore-min.js )

Rails.application.config.assets.precompile += %w( backbone-min.js )

Rails.application.config.assets.precompile += %w( backbone.marionette.min.js )

Rails.application.config.assets.precompile += %w( models/askquestion.js )

Rails.application.config.assets.precompile += %w( views/askquestionview.js )

Rails.application.config.assets.precompile += %w( main1.js )


Rails.application.config.assets.precompile += %w( backbone.modal.js )