---
title: "Building RadioApp: A Cross-Platform Flutter Radio Streaming App"
description: "is a Flutter radio streaming app that lets users listen to online radio stations from: Indonesia, United States, China, Germany, Japan, India, United Kingdom, France, Italy, Brazil, Canada, Russia, South Korea, Australia, and Spain."
date: 2026-03-30
image: https://res.cloudinary.com/dtfr5rwgo/image/upload/v1774853392/Screenshot_2026-03-30_at_13.49.16_xiux0a.png
minRead: 8
mode: singlepage
author:
  name: Nur Avesina Mustari
  avatar:
    src: https://res.cloudinary.com/dtfr5rwgo/image/upload/v1773812086/Gemini_Generated_Image_pu6povpu6povpu6p_kdjbku.png
    alt: Nur Avesina Mustari
---
## Main features
- Live radio streaming
- Bookmark favorite stations for quick access

## Screenshots

<table align="center" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">
      <img src="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1774851782/Screenshot_1774851391_ce96gg.png" alt="Screenshot 4" width="150"/>
    </td>
    <td align="center">
      <img src="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1774851782/Screenshot_1774851396_dknscz.png" alt="Screenshot 3" width="150"/>
    </td>
    <td align="center">
      <img src="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1774851782/Screenshot_1774851400_r8k2a7.png" alt="Screenshot 2" width="150"/>
    </td>
    <td align="center">
      <img src="https://res.cloudinary.com/dtfr5rwgo/image/upload/v1774851782/Screenshot_1774851404_adifnm.png" alt="Screenshot 1" width="150"/>
    </td>
  </tr>
</table>


## Introduction

In this blog post, I’ll share the journey of building **RadioApp**, a cross-platform radio streaming application using Flutter. The app is designed to stream radio stations from around the world, with a modern UI and robust architecture.

## Why Flutter?

Flutter allows for rapid development and a single codebase for Android, iOS, Web, macOS, Windows, and Linux. Its widget system and strong community make it ideal for building beautiful, performant apps.

## Key Features
- Stream radio stations globally
- Responsive, modern UI
- Platform support: Android, iOS, Web, Desktop
- Modular codebase for scalability

## Project Structure
```
lib/
  core/
    data/
    view_model/
    ...
  features/
    play/
    list/
assets/
  icon/
  lottie/
```

## Architecture: MVVM (Work in Progress)

RadioApp is being refactored to follow the **MVVM (Model-View-ViewModel)** pattern:
- **Model**: Data classes, business logic, repositories
- **View**: UI widgets and screens
- **ViewModel**: State management and logic for views

This separation improves testability and maintainability.

## State Management with Riverpod

We use [Riverpod](https://riverpod.dev/) for state management. Riverpod offers a robust, testable, and scalable approach, avoiding context-related issues and making providers easy to test and mock.

**Example:**
```dart
final stationProvider = NotifierProvider<StationViewmodel, StationState>(
  StationViewmodel.new,
);
```

## Key Libraries Used
- **flutter_riverpod**: State management
- **just_audio**: Audio playback
- **dio**: HTTP networking
- **encrypt_shared_preferences**: Secure local storage
- **geolocator / geocoding**: Location services
- **lottie**: Animations
- **freezed / json_serializable**: Data classes and serialization
- **audio_service / audio_session**: Background audio
- **volume_controller**: System volume
- **pretty_dio_logger**: HTTP logging
- **permission_handler**: Permissions

## Challenges & Learnings
- Adapting MVVM in Flutter (ongoing)
- Managing audio streams across platforms
- Handling permissions and background tasks

## Next Steps
- Complete MVVM migration
- Add more radio features (favorites, search, etc.)
- Improve UI/UX

## Conclusion

RadioApp is a work in progress, but it demonstrates the power of Flutter for cross-platform development and the benefits of modern state management with Riverpod. Stay tuned for more updates!

---

**GitHub Repository:** [https://github.com/avesin/radiohub](https://github.com/avesin/radiohub)

**[Download RadioHub on the Google Play Store today](https://play.google.com/store/apps/details?id=com.jadigaknih.radio.radioapp)** and start listen radio from everywhere to everywhere

*Follow the project on GitHub and feel free to contribute or provide feedback!*
