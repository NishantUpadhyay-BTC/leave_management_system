module ApplicationHelper
  def sortable(column, title = nil)
    title ||= column.titleize 
    direction = (column == params[:sort] && params[:direction] == "asc") ? "desc" : "asc"
    if column != params[:sort]
      css_class = "fa fa-sort"
    elsif params[:direction] == "asc"
      css_class = "fa fa-sort-asc"
    else
      css_class = "fa fa-sort-desc"
    end
    link_to title, {:sort => column, :direction => direction, :page => params[:page]}, {class: css_class, remote: :true}  
  end

  def remaining_leave(user)
    remaining_leave = (Settings.magic_number.fifteen - user.sign_offs.approved.count)
  end
end
