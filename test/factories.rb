FactoryGirl.define do

  factory :user do
    name "johnna"
    email "john12@gmail.com"
    designation "developer"
    gender "male"
    date_of_joining "11/07/2016"
    date_of_birth "12/08/1994"
    password "john@123"
    access_token SecureRandom.hex

    trait :user_for_sign_off do
      email "john@gmail.com"
    end

    trait :user_for_notification do
      name "john"
      email "prina123@gmail.com"
    end

    trait :user_for_test do
      email "prina@gmail.com"
    end

    factory :user_with_sign_off do
      transient do
        comments_count 1
        approved_sign_offs_count 2
        pending_sign_offs_count 2
        rejected_sign_offs_count 1
        sign_off_requester_count 1
        notification_count 1
        profile_count 1
        count 1
      end

      after(:create) do |user, evaluator|
        sign_offs = Array.new
        sign_offs << create_list(:sign_off, evaluator.pending_sign_offs_count, user: user, sign_off_type: FactoryGirl.create(:sign_off_type), sign_off_status: 'pending')
        create_list(:sign_off, evaluator.approved_sign_offs_count, user: user, sign_off_type: FactoryGirl.create(:sign_off_type), sign_off_status: 'approved')
        create_list(:sign_off, evaluator.rejected_sign_offs_count, user: user, sign_off_type: FactoryGirl.create(:sign_off_type), sign_off_status: 'rejected')
        sign_offs[0].each do |sign_off|
          create_list(:comment, evaluator.comments_count, sign_off: sign_off, user: user)
          create_list(:sign_off_requester, evaluator.sign_off_requester_count, sign_off: sign_off, user: user)
          create_list(:notification, evaluator.notification_count, sign_off: sign_off, user: user)
        end 
        create_list(:profile, evaluator.profile_count, user: user)
        create_list(:profile, evaluator.profile_count, user: FactoryGirl.create(:user, :user_for_sign_off))
        sign_off = create_list(:sign_off, evaluator.count, user: FactoryGirl.create(:user, :user_for_notification), sign_off_type: FactoryGirl.create(:sign_off_type), sign_off_status: 'approved')
        create_list(:notification, evaluator.count, sign_off: sign_off[0], user: user)
      end
    end
  end

  factory :sign_off_type do
    sign_off_type_name "sick"
    no_of_days 5
    description "sick leave description"

    trait :casual do
      sign_off_type_name "casual"
      no_of_days 3
      description "casual leave description"
    end
  end

  factory :sign_off do
    date_from "10/11/2016"
    date_to "12/11/2016"
    reason "This is reason"
    half_full_leave "full"
    description "This is description"
    sign_off_type
    association :user, strategy: :build
  end

  factory :sign_off_requester do

  end

  factory :notification do
    association :user, strategy: :build
  end

  factory :comment do
    message "hello"
  end

  factory :role do
    name 'admin'
  end

  factory :holiday do
    date "22/11/2017"

    trait :xmas do
      date "25/12/2017"
    end
  end

  factory :profile do
    joining_date "11/07/2016"
    probation_period 3
    confirmation_status true
    skills "management"
    current_address "ahmedabad"
    permanent_address "ahmedabad"
    phone_number 73224223
    emergency_contact_number 758239823
    personal_email_id "john@gmail.com"
    qualification "degree"
    education_institute "abcd"
  end
end
