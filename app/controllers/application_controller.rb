class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    return nil unless session[:token]
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user)
    @current_user = user
    session[:token] = user.reset_token!
  end

  def sign_out!
    current_user.try(:reset_token)
    session[:token] = nil
  end

  def create_guest_if_needed

    puts "create guest if needed"

    return if signed_in? # already logged in, don't need to create another one

    user = User.new_guest

    puts user.username

    sign_in!(user)
  end
end
