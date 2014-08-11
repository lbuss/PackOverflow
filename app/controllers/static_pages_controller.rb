class StaticPagesController < ApplicationController
  def root
    if !current_user
      @user = User.find_by_username_and_password(username: "Guest", password: "password")
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["invalid email and/or password"]
      render :new
    end
  end
end