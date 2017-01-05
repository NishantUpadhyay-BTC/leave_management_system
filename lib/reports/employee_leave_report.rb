module Reports
  class EmployeeLeaveReport

    def generate_report(id, year)
      sign_offs = User.find(id).sign_offs
      sign_offs_of_year = sign_offs.includes(:sign_off_type).where('extract(year from date_from) = ?', year)
      sign_offs_data = Hash.new
      sign_offs_of_year.each do |sign_off|
        if sign_offs_data.has_key?(sign_off.date_from.strftime("%B"))
          sign_offs_data[sign_off.date_from.strftime("%B")].store(sign_off.date_from, sign_off.sign_off_type.sign_off_type_name)
        else
          sign_offs_data[sign_off.date_from.strftime("%B")] = {sign_off.date_from => sign_off.sign_off_type.sign_off_type_name}
        end
      end
      return sign_offs_data
    end

    def comparision_report(year)
      users = User.all
      sign_offs_data = Hash.new
      users.each do |user|
        sign_offs = user.sign_offs.includes(:sign_off_type).where('extract(year from date_from) = ?', year)
        sign_offs.each do |sign_off|
          if sign_offs_data.has_key?(user.name)
            if sign_offs_data[user.name].has_key?(sign_off.sign_off_type.sign_off_type_name)
              sign_offs_data[user.name][sign_off.sign_off_type.sign_off_type_name] += 1
            else
              sign_offs_data[user.name].store(sign_off.sign_off_type.sign_off_type_name, 1)
            end
          else
            sign_offs_data[user.name] = { sign_off.sign_off_type.sign_off_type_name => 1 }
          end
        end 
      end
      return sign_offs_data
    end
  end
end
