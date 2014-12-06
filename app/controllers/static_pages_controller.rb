class StaticPagesController < ApplicationController
	before_filter :create_guest_if_needed

  def root
    # if !current_user
    #   redirect_to new_session_url
    # end
  end
end