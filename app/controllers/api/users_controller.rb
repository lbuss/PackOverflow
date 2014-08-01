module Api
  class UsersController < ApiController

    def show
      @user = User.find(params[:id])
      
      @topQuestions = Question.select("questions.*, COALESCE(SUM(votes.value), 0) AS sum_votes, COUNT(DISTINCT answers.id) AS num_answers")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .includes(:user)
            .joins("LEFT OUTER JOIN answers ON (question_id = questions.id)")
            .where(user_id: @user.id)
            .group("questions.id")
            .order("sum_votes desc");
            
      @newQuestions = Question.select("questions.*, SUM(votes.value) AS sum_votes, COUNT(DISTINCT answers.id) AS num_answers")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .joins("LEFT OUTER JOIN answers ON (question_id = questions.id)")
            .includes(:user)
            .where(user_id: @user.id)
            .group("questions.id")
            .order("created_at desc");
      
      # @questions = Question.select("questions.*, SUM(votes.value) AS sum_votes")
   #          .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
   #          .group("questions.id")
   #          .where(user_id: @user.id);
            
      # @answers = Answer.select("answers.*, SUM(votes.value) AS sum_votes")
#             .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
#             .group("answers.id")
#             .where(user_id: @user.id);
            
      @topAnswers = Answer.select("answers.*, COALESCE(SUM(votes.value), 0) AS sum_votes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
            .includes(:user)
            .where(user_id: @user.id)
            .group("answers.id")
            .order("sum_votes desc");
            
      @newAnswers = Answer.select("answers.*, COALESCE(SUM(votes.value), 0) AS sum_votes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
            .includes(:user)
            .where(user_id: @user.id)
            .group("answers.id")
            .order("created_at desc");
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