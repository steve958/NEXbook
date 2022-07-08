import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { filterUserById } from '../helpers/filters'
import './UserNotificationsModal.css'
import { Notification } from '../helpers/types'
import { clearAllNotifications } from '../helpers/ApiCalls'
import { setLoggedUsersData } from '../features/user-slice'

interface UserNotificationsModalProps {
  setSearchQuery: Function
  setShowOnlyPrivateFeedsClicked: Function
  setShowOnlyPublicFeedsClicked: Function
}

const UserNotificationsModal: React.FC<UserNotificationsModalProps> = (
  props,
) => {
  const [confirmationModalClicked, setConfirmationModal] = useState<boolean>(
    false,
  )
  let loggedUser = useAppSelector((state) => state.user.loggedUser)
  let allUsers = useAppSelector((state) => state.user.allUsersData)
  const dispatch = useAppDispatch()

  async function handleClearNotifications(id: string) {
    const response = await clearAllNotifications(id)
    if (response._id) {
      dispatch(setLoggedUsersData(response))
    }
    setConfirmationModal(false)
  }

  function handleNotificationsClicked(notification: Notification) {
    props.setShowOnlyPrivateFeedsClicked(false)
    props.setShowOnlyPublicFeedsClicked(true)
    props.setSearchQuery(notification.actionTarget)
  }

  return (
    <div id="notifications-container">
      {loggedUser!.notifications.length > 0 ? (
        loggedUser!.notifications!.map((notification: Notification) => {
          if (notification !== null) {
            console.log(
              (new Date().getTime() -
                new Date(notification.actionDate).getTime()) /
                86400000,
            )

            return (
              <div
                id="notification-wrapper"
                key={notification._id}
                onClick={() =>
                  notification.actionTarget
                    ? handleNotificationsClicked(notification)
                    : null
                }
              >
                <p>
                  {filterUserById(notification.actionTargetPerson, allUsers)
                    .userName === loggedUser!.userName
                    ? 'You'
                    : filterUserById(notification.actionTargetPerson, allUsers)
                        .userName}{' '}
                  liked your feed{' '}
                  {Math.round(
                    (new Date().getTime() -
                      new Date(notification.actionDate).getTime()) /
                      86400000,
                  ) < 1
                    ? 'today'
                    : Math.round(
                        (new Date().getTime() -
                          new Date(notification.actionDate).getTime()) /
                          86400000,
                      ) === 1
                    ? `yesterday`
                    : `${Math.round(
                        (new Date().getTime() -
                          new Date(notification.actionDate).getTime()) /
                          86400000,
                      )} days ago`}
                </p>
              </div>
            )
          }
        })
      ) : (
        <p>--- no notifications ---</p>
      )}
      {loggedUser!.notifications.length > 0 ? (
        <p
          id="clear-all-notifications"
          onClick={() => setConfirmationModal(true)}
        >
          CLEAR ALL NOTIFICATIONS
        </p>
      ) : null}
      {confirmationModalClicked && (
        <div id="confirmation-modal">
          <h1>Are you sure?</h1>
          <span id="confirmation-modal-img-wrapper">
            <img
              src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131__340.png"
              alt=""
            />
          </span>
          <div id="confirmation-modal-wrapper">
            <button
              id="yes-button"
              onClick={() => handleClearNotifications(loggedUser!._id)}
            >
              YES
            </button>
            <button
              id="cancel-button"
              onClick={() => setConfirmationModal(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNotificationsModal
