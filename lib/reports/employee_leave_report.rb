module Reports
  class EmployeeLeaveReport

    def generate_report(user_id, year)
      sign_offs = User.find(user_id).sign_offs
      sign_offs_of_year = sign_off_data(sign_offs, year)
      sign_offs_data = Hash.new
      sign_offs_of_year.each do |sign_off|
        sign_off_date = sign_off.date_from
        if sign_offs_data.has_key?(sign_off_date.strftime("%B"))
          sign_offs_data[sign_off_date.strftime("%B")].store(sign_off_date, sign_off_type_data(sign_off))
        else
          sign_offs_data[sign_off_date.strftime("%B")] = {sign_off_date => sign_off_type_data(sign_off)}
        end
      end
      return sign_offs_data
    end

    def comparision_report(year)
      users = User.all
      sign_offs_data = Hash.new
      users.each do |user|
        user_sign_offs = user.sign_offs
        sign_offs = sign_off_data(user_sign_offs, year)
        sign_offs.each do |sign_off|
          sign_off_user = user.name
          if sign_offs_data.has_key?(sign_off_user)
            if sign_offs_data[sign_off_user].has_key?(sign_off_type_data(sign_off))
              sign_offs_data[sign_off_user][sign_off_type_data(sign_off)] += 1
            else
              sign_offs_data[sign_off_user].store(sign_off_type_data(sign_off), 1)
            end
          else
            sign_offs_data[sign_off_user] = { sign_off_type_data(sign_off) => 1 }
          end
        end 
      end
      return sign_offs_data
    end

    private 

    def sign_off_type_data(sign_off)
      sign_off.sign_off_type.sign_off_type_name
    end

    def sign_off_data(sign_offs, year)
      sign_offs.includes(:sign_off_type).where('extract(year from date_from) = ?', year)
    end
  end
end
