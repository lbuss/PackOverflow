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

      # KNOWN BUG: TWO OUTER JOINS DO A CARTESIAN MULTIPLICATION OF SUM_VOTES BY NUM_ANSWERS. Currently ducttaped in backbone router.

      @questions = Question.select("questions.*, COUNT(DISTINCT answers.id) AS num_answers, COALESCE(SUM(votes.value), 0) AS sum_votes")
            .joins("LEFT OUTER JOIN answers ON question_id = questions.id")
            .joins("LEFT OUTER JOIN votes ON votes.votable_id = questions.id AND votes.votable_type = 'Question'")
            .includes(:user)
            .group("questions.id, votes.votable_id")
            .order("sum_votes desc NULLS LAST");
      render :index
      # render json: @topQuestions[0]
    end

    def show

      @question = Question.select("questions.*, SUM(votes.value) AS sum_votes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = questions.id AND votes.votable_type = 'Question')")
            .includes(:user)
            .group("questions.id").find(params[:id]);
      @answers = Answer.select("answers.*, SUM(votes.value) AS sum_votes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = answers.id AND votes.votable_type = 'Answer')")
            .includes(:user)
            .group("answers.id").where(question_id: params[:id]);
      @comments = Comment.select("comments.*, SUM(votes.value) AS sum_votes")
            .joins("LEFT OUTER JOIN votes ON (votes.votable_id = comments.id AND votes.votable_type = 'Comment')")
            .includes(:user)
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