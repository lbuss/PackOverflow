module Api
  class CommentsController < ApiController
    def new
    end
    
    def create
      @comment = current_user.comments.new(comment_params)

      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = current_user.comments.find(params[:id])
      @comment.try(:destroy)
      render json: {}
    end

    def index
      #should return top comments
      @comments = Comment.all
      render json: @comments
    end

    def show
     #.includes(:comments, lists: :comments)
      @comment = Comment.find(params[:id])
      if @comment
        render json: @comment
      else
        render json: ["Comment not found"], status: 404
      end
    end

    private

    def comment_params
      params.require(:comment).permit(:title, :body, :commentable_id, :commentable_type)
    end
  end
end