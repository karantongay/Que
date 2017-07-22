require 'rails_helper.rb'

feature 'Testing', :js => true do
  scenario 'Login' do

    visit '/'
    click_on 'Login'
    sleep(1)
    within '.login-form' do
    fill_in 'user_email', with: 'capybara@test.com'
    sleep(1)
    fill_in 'user_password', with: 'abcd123'
    sleep(1)
    end

    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user, :run_callbacks => false)
    click_on 'Login'
    sleep(1)
    visit '/questions'
    sleep(1)
    click_on 'Ask New Question'
    sleep(1)
    fill_in 'question_title', with: 'This is Capybara testing this application?'
    sleep(1)
    fill_in 'question_contents', with: 'This contents entered during testing!'
    sleep(1)
    click_on 'Submit Question'
    sleep(2)
    expect(page).to have_content('This is Capybara testing this application')
    sleep(2)
    click_on 'Question Feed'
    sleep(2)
    click_on 'Log out'
    sleep(2)

  end

  scenario 'Answer Question' do

    visit '/'
    click_on 'Login'
    sleep(1)
    within '.login-form' do
    fill_in 'user_email', with: 'capybara@test.com'
    sleep(1)
    fill_in 'user_password', with: 'abcd123'
    sleep(1)
    end

    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user, :run_callbacks => false)
    click_on 'Login'
    sleep(1)
    visit '/questions'
    sleep(1)
    within '.table' do
    #click_on 'View'
    first(:link, 'View').click
    visit '/questions/:id'
    sleep(3)
    end
    fill_in 'answer_contents', with: 'This answer written during testing!'
    sleep(2)
    click_on 'submit'
    sleep(2)
    expect(page).to have_content('This answer is written during testing!')
    click_on 'Log out'
    sleep(1)

  end

  scenario 'Search Questions' do

    visit '/'
    click_on 'Login'
    sleep(1)
    within '.login-form' do
    fill_in 'user_email', with: 'capybara@test.com'
    sleep(1)
    fill_in 'user_password', with: 'abcd123'
    sleep(1)
    end
    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user, :run_callbacks => false)
    click_on 'Login'
    sleep(1)

    visit '/questions'
    sleep(1)
    fill_in 'search', with: 'Capybara'
    sleep(1)
    click_on 'Search'
    sleep(1)
    expect(page).to have_content('Search Results')
    sleep(1)
    click_on 'Log out'
    sleep(1)

  end

  scenario 'Delete Someone Elses Question' do

    visit '/'
    click_on 'Login'
    sleep(1)
    within '.login-form' do
    fill_in 'user_email', with: 'capybara@test.com'
    sleep(1)
    fill_in 'user_password', with: 'abcd123'
    sleep(1)
    end
    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user, :run_callbacks => false)
    click_on 'Login'
    sleep(1)
    visit '/questions'
    sleep(1)
     within '.table' do
    #click_on 'View'
    first(:link, 'View').click
    visit '/questions/:id'
    sleep(3)
    end
    click_on 'delete_question'
    sleep(2)
    page.driver.browser.switch_to.alert.accept
    expect(page).to have_content("Cannot delete other users' question")
    # sleep(1)
    click_on 'Log out'
    sleep(1)

  end

end