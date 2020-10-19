package hu.elte.issuetracker.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String SECRET_PROPERTY_NAME = "security.jwt.secret";
    
    @Autowired
    private Environment environment;
    
//    private static void handleException(HttpServletRequest req, HttpServletResponse rsp, AuthenticationException e)
//    throws IOException {
//        PrintWriter writer = rsp.getWriter();
//        writer.println(new ObjectMapper().writeValueAsString("Unauthorized"));
//        rsp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String secret = environment.getProperty(SECRET_PROPERTY_NAME);
        http    
            // .authorizeRequests().anyRequest().permitAll();
                .cors().and()
                .csrf().disable()
                .headers()
                    .frameOptions().disable()
                    .and()
                .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/api/auth").permitAll()
                    .antMatchers(HttpMethod.POST, "/users").permitAll()
                    .antMatchers("/h2/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
// //                .exceptionHandling().authenticationEntryPoint(WebSecurityConfig::handleException)
// //                    .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), secret))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), secret))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                
    }

//    @Autowired
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .inMemoryAuthentication()
//                .withUser("user")
////                .password(passwordEncoder().encode("user"))
//                .password("{noop}user")
//                .authorities("ROLE_USER");
//    }

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return bCryptPasswordEncoder;
    }
    
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }
    
    // @Bean
    // CorsConfigurationSource corsConfigurationSource() {
    //   final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //   source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
    //   return source;
    // }

}
