module Api
  class UsersController < ApiController

    def show

       # KNOWN BUG: TWO OUTER JOINS DO A CARTESIAN MULTIPLICATION OF SUM_VOTES BY NUM_ANSWERS.  Currently ducttaped in backbone User model.

      @user = User.find(params[:id])
      
      @questions = Question.select("questions.*, COALESCE(SUM(votes.value), 0) AS sum_votes, COUNT(DISTINCT answers.id) AS num_answers")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .includes(:user)
            .joins("LEFT OUTER JOIN answers ON (question_id = questions.id)")
            .where(user_id: @user.id)
            .group("questions.id")
            .order("sum_votes desc");
            
      @answers = Answer.select("answers.*, COALESCE(SUM(votes.value), 0) AS sum_votes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
            .includes(:user)
            .where(user_id: @user.id)
            .group("answers.id")
            .order("sum_votes desc");
            
      # @comments = Comment.select("comments.*, SUM(votes.value) AS sum_votes, users.username AS username")
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