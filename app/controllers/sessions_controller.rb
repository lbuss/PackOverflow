class SessionsController < ApplicationController
  def new
    if current_user
      redirect_to static_pages
    end
  end
  
  def create
    @user = User.find_by_credentials(params[:user])
    
    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["invalid email and/or password"]
      render :new
    end
  end
  
  def destroy
    sign_out!
    redirect_to new_session_url
  end
end
