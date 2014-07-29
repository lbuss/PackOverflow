module Api
  class UsersController < ApiController

    def show
      @user = User.find(params[:id])
      
      @questions = Question.select("questions.*, SUM(votes.value) AS sumVotes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .joins(:user)
            .group("questions.id")
            .where(user_id: @user.id);
      @answers = Answer.select("answers.*, SUM(votes.value) AS sumVotes, users.username AS username")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
            .joins(:user)
            .group("answers.id")
            .where(user_id: @user.id);
      # @comments = Comment.select("comments.*, SUM(votes.value) AS sumVotes, users.username AS username")
      #       .joins("LEFT OUTER JOIN votes ON (votes.votable_id = comments.id AND votes.votable_type = 'Comment')")
      #       .joins(:user)
      #       .group("comments.id")
      #       .where(user_id: @user.id);
            
      if @user
        render :show
      else
        render json: ["User not found"], status: 404
      end
    end
  end
end