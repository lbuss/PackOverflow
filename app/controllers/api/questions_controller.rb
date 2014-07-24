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
      #should return top questions
      @questions = Question.all
      render json: @questions
    end

    def show
     #.includes(:comments, lists: :comments)
      @question = Question.find(params[:id])
      if @question
        render json: @question, include: [:answers]
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