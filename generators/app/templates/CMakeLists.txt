cmake_minimum_required(VERSION 3.2)
project(<%= projectName %> VERSION 1.0.0 LANGUAGES C)

option(BUILD_<%= shortName %>_EXAMPLE "Set to ON to build <%= projectName %> example." OFF)

include(CMakePackageConfigHelpers)
include(GNUInstallDirs)

add_library(<%= projectName %> STATIC levenshtein.c levenshtein.h)

target_include_directories(<%= projectName %>
    PUBLIC
    "$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>"
    "$<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}>"
)

target_compile_definitions(<%= projectName %> PRIVATE <%= shortName %>_IMPLEMENTATION)

set_target_properties(<%= projectName %> PROPERTIES VERSION ${PROJECT_VERSION})
set_target_properties(<%= projectName %> PROPERTIES PUBLIC_HEADER levenshtein.h)

if(BUILD_<%= shortName %>_EXAMPLE)
  add_subdirectory(example)
endif()

configure_package_config_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/cmake/config.cmake.in"
    "${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}-config.cmake"
    INSTALL_DESTINATION "${CMAKE_INSTALL_LIBDIR}/cmake/${PROJECT_NAME}"
)

# Install
install(TARGETS <%= projectName %>
    EXPORT <%= projectName %>-targets
    ARCHIVE DESTINATION "${CMAKE_INSTALL_LIBDIR}"
    LIBRARY DESTINATION "${CMAKE_INSTALL_LIBDIR}"
    RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}"
    PUBLIC_HEADER DESTINATION "${CMAKE_INSTALL_INCLUDEDIR}"
)

install(EXPORT <%= projectName %>-targets
    DESTINATION "${CMAKE_INSTALL_LIBDIR}/cmake/${PROJECT_NAME}"
)

install(
    FILES "${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}-config.cmake"
    DESTINATION "${CMAKE_INSTALL_LIBDIR}/cmake/${PROJECT_NAME}"
)
