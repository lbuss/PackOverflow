module Api
  class AnswersController < ApiController
    def new
    end
    
    def create
      question = Question.find_by_id(params[:question_id]);
      @answer = question.answers.new(answer_params)
   
      unless current_user.guest
        @answer.user_id = current_user.id
      end
      
      if @answer.save
        render json: @answer
      else
        render json: @answer.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @answer = current_user.answers.find(params[:id])
      @answer.try(:destroy)
      render json: {}
    end

    def index
      #should return top answers
      @answers = Answer.all
      render json: @answers
    end

    def show
     #.includes(:comments, lists: :comments)
      @answer = Answer.find(params[:id])
      if @answer
        render json: @answer, include: [:comments]
      else
        render json: ["Answer not found"], status: 404
      end
    end

    private

    def answer_params
      params.require(:answer).permit(:body)
    end
  end
end