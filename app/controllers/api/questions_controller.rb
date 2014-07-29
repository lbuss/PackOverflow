module Api
  class QuestionsController < ApiController
    def new
    end
    
    def create
      @question = current_user.questions.new(question_params)
      if @question.save
        render json: @question
      else
        render json: @question.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @question = current_user.questions.find(params[:id])
      @question.try(:destroy)
      render json: {}
    end

    def index
      #should return top questions or whatever eventually, might be easier with SQL, maybe more efficient to sort the collections
      @questions = Question.select("questions.*, SUM(votes.value) AS sumVotes, users.username AS username")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .joins(:user)
            .group("questions.id");
      render json: @questions
    end

    def show
      # @question = Question.select("questions.*, SUM(votes.value) AS sumVotes")
  #           .joins(:votes).group("questions.id").find(params[:id]);
      @question = Question.select("questions.*, SUM(votes.value) AS sumVotes, users.username AS username")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .joins(:user)
            .group("questions.id").find(params[:id]);
      @answers = Answer.select("answers.*, SUM(votes.value) AS sumVotes, users.username AS username")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
            .joins(:user)
            .group("answers.id").where(question_id: params[:id]);
      @comments = Comment.select("comments.*, SUM(votes.value) AS sumVotes, users.username AS username")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = comments.id AND votes.votable_type = 'Comment')")
            .joins(:user)
            .group("comments.id").where( "(commentable_id = ? AND commentable_type = 'Question') OR (commentable_id IN (?) AND commentable_type = 'Answer')", 
            @question.id, @answers.map(&:id));
            
      if @question
        render :show
      else
        render json: ["Question not found"], status: 404
      end
    end

    private

    def question_params
      params.require(:question).permit(:title, :body)
    end
  end
end