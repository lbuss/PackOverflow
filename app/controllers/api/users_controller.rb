module Api
  class UsersController < ApiController

    def show
      @user = User.find(params[:id])
      
      @question = Question.select("questions.*, SUM(votes.value) AS sumVotes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .joins(:user)
            .where(user_id: @user.id)
            .group("questions.id").find(params[:id]);
      @answers = Answer.select("answers.*, SUM(votes.value) AS sumVotes, users.username AS username")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
            .joins(:user)
            .where(user_id: @user.id)
            .group("answers.id").where(question_id: params[:id]);
      @comments = Comment.select("comments.*, SUM(votes.value) AS sumVotes, users.username AS username")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = comments.id AND votes.votable_type = 'Comment')")
            .joins(:user)
            .where(user_id: @user.id)
            .group("comments.id").where( "(commentable_id = ? AND commentable_type = 'Question') OR (commentable_id IN (?) AND commentable_type = 'Answer')", 
            @question.id, @answers.map(&:id));
            
      if @user
        render :show
      else
        render json: ["User not found"], status: 404
      end
    end
  end
end