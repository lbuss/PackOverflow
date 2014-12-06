class UsersController < ApplicationController
  def new
    # if current_user
    #   redirect_to static_pages
    # end
  end

   def create
     @user = user_params[:username] ? User.new(user_params) : User.new_guest

     if @user.save
        @current_user.move_to(@user) if current_user && current_user.guest?
       sign_in!(@user)
       redirect_to root_url
     else
       flash.now[:errors] = @user.errors.full_messages
       render :new
     end
   end

   private

   def user_params
     params.require(:user).permit(:email, :username, :password)
   end
end
